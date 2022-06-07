#pragma once


#include "Pointer.h"


namespace Utility {

    struct DetourConfig
    {
        Pointer HookAddress;
        size_t HookSize;

        void(*DetourFunction)();
        
        bool PreserveFlags;
        bool PreserveRegisters;
        bool KeepOriginalCode;
    };


    class Detour
    {
    public:
        Detour(const DetourConfig& config);

        void Install();

    private:
        struct ThunkData
        {
            void* ThunkAddress;
            void* DetourFunctionAddress;
            void* OriginalCodeAddress;
            uint8_t MachineCode[32];
        };

        ThunkData* AllocateThunk() const;
        void BuildThunk() const;

    private:
        DetourConfig m_Config;
        ThunkData* m_ThunkData;
    };

}