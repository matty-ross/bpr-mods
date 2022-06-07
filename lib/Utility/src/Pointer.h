#pragma once


#include <cstdint>


namespace Utility {

    class Pointer
    {
    public:
        Pointer(void* address)
            :
            m_Address(address)
        {
        }
        
        Pointer(uintptr_t address)
            :
            m_Address(reinterpret_cast<void*>(address))
        {
        }

        template <typename T = void*>
        inline T& GetAddress()
        {
            return reinterpret_cast<T&>(m_Address);
        }

        template <typename T = void*>
        inline const T& GetAddress() const
        {
            return reinterpret_cast<const T&>(m_Address);
        }
        
        template <typename T>
        inline volatile T& As() const
        {
            return *reinterpret_cast<volatile T*>(m_Address);
        }

        inline Pointer At(ptrdiff_t offset) const
        {
            return Pointer(GetAddress<uintptr_t>() + offset);
        }

        inline Pointer Field(ptrdiff_t offset) const
        {
            return Pointer(As<uintptr_t>() + offset);
        }
        
    private:
        void* m_Address;
    };

}