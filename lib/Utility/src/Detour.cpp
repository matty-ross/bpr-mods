#include "pch.h"
#include "Detour.h"

#include "Exception.h"


namespace Utility {
    
    Detour::Detour(const DetourConfig& config)
        :
        m_Config(config),
        m_ThunkData(nullptr)
    {
    }
    
    void Detour::Install()
    {
        if (m_Config.HookSize < 6)
        {
            throw EXCEPTION("Failed to install a detour, because the hook size is less than minimum.");
        }

        m_ThunkData = AllocateThunk();
        m_ThunkData->ThunkAddress = m_ThunkData->MachineCode;
        m_ThunkData->DetourFunctionAddress = m_Config.DetourFunction;
        m_ThunkData->OriginalCodeAddress = m_Config.HookAddress.At(m_Config.HookSize).GetAddress();
        BuildThunk();

        DWORD oldProtection = 0;
        if (::VirtualProtect(m_Config.HookAddress.GetAddress(), m_Config.HookSize, PAGE_EXECUTE_READWRITE, &oldProtection) == FALSE)
        {
            throw WINDOWS_EXCEPTION("Failed to change memory page protection for a detour hook.");
        }

        // jmp dword ptr ds:[XXX]
        m_Config.HookAddress.At(0x0).As<uint8_t>() = 0xFF;
        m_Config.HookAddress.At(0x1).As<uint8_t>() = 0x25;
        m_Config.HookAddress.At(0x2).As<void**>() = &m_ThunkData->ThunkAddress;

        for (size_t i = 6; i < m_Config.HookSize; ++i)
        {
            // nop
            m_Config.HookAddress.At(i).As<uint8_t>() = 0x90;
        }

        ::VirtualProtect(m_Config.HookAddress.GetAddress(), m_Config.HookSize, oldProtection, &oldProtection);
    }

    Detour::ThunkData* Detour::AllocateThunk() const
    {
        void* const data = ::VirtualAlloc(nullptr, sizeof(ThunkData), MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);
        if (data == nullptr)
        {
            throw WINDOWS_EXCEPTION("Failed to allocate a detour thunk.");
        }

        return static_cast<ThunkData*>(data);
    }

    void Detour::BuildThunk() const
    {
        Pointer currentAddress = m_ThunkData->MachineCode;
        
        // save flags
        if (m_Config.PreserveFlags)
        {
            // pushfd
            currentAddress.At(0x0).As<uint8_t>() = 0x9C;
            
            currentAddress.GetAddress<uint8_t*>() += 1;
        }

        // save registers
        if (m_Config.PreserveRegisters)
        {
            // pushad
            currentAddress.At(0x0).As<uint8_t>() = 0x60;

            currentAddress.GetAddress<uint8_t*>() += 1;
        }

        // call detour function
        {
            // call dword ptr ds:[XXX]
            currentAddress.At(0x0).As<uint8_t>() = 0xFF;
            currentAddress.At(0x1).As<uint8_t>() = 0x15;
            currentAddress.At(0x2).As<void**>() = &m_ThunkData->DetourFunctionAddress;

            currentAddress.GetAddress<uint8_t*>() += 6;
        }

        // restore registers
        if (m_Config.PreserveRegisters)
        {
            // popad
            currentAddress.At(0x0).As<uint8_t>() = 0x61;
            
            currentAddress.GetAddress<uint8_t*>() += 1;
        }

        // restore flags
        if (m_Config.PreserveFlags)
        {
            // popad
            currentAddress.At(0x0).As<uint8_t>() = 0x9D;

            currentAddress.GetAddress<uint8_t*>() += 1;
        }

        // original code
        if (m_Config.KeepOriginalCode)
        {
            for (size_t i = 0; i < m_Config.HookSize; ++i)
            {
                currentAddress.At(i).As<uint8_t>() = m_Config.HookAddress.At(i).As<uint8_t>();
            }

            currentAddress.GetAddress<uint8_t*>() += m_Config.HookSize;
        }

        // jump back to the original code
        {
            // jmp dword ptr ds:[XXX]
            currentAddress.At(0x0).As<uint8_t>() = 0xFF;
            currentAddress.At(0x1).As<uint8_t>() = 0x25;
            currentAddress.At(0x2).As<void**>() = &m_ThunkData->OriginalCodeAddress;

            currentAddress.GetAddress<uint8_t*>() += 6;
        }
    }

}