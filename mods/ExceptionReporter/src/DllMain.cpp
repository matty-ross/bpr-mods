#define WIN32_LEAN_AND_MEAN


#include <Windows.h>

#include "Utility.h"

#include "ExceptionReport.h"


static HINSTANCE s_Instance = nullptr;
static HANDLE s_LoadThreadHandle = nullptr;
static bool s_Initialized = false;


LONG CALLBACK TopLevelExceptionFilter(EXCEPTION_POINTERS* exceptionPointers)
{
    const ExceptionReport exceptionReport(*exceptionPointers);
    exceptionReport.Display(s_Instance);

    return EXCEPTION_CONTINUE_SEARCH;
}

DWORD CALLBACK LoadThread(LPVOID lpParameter)
{
    while (true)
    {
        const LPTOP_LEVEL_EXCEPTION_FILTER previousExceptionFilter = ::SetUnhandledExceptionFilter(TopLevelExceptionFilter);
        if (previousExceptionFilter == Utility::Pointer(0x0085CCEC).GetAddress<LPTOP_LEVEL_EXCEPTION_FILTER>())
        {
            break;
        }

        ::Sleep(1000);
    }   

    return 0;
}

extern "C" __declspec(dllexport) void LoadMod()
{
    if (!s_Initialized)
    {
        s_LoadThreadHandle = ::CreateThread(nullptr, 0, LoadThread, nullptr, 0, nullptr);
        s_Initialized = true;
    }
}

BOOL WINAPI DllMain(
    _In_ HINSTANCE hinstDLL,
    _In_ DWORD     fdwReason,
    _In_ LPVOID    lpvReserved
)
{
    switch (fdwReason)
    {
    case DLL_PROCESS_ATTACH:
        ::DisableThreadLibraryCalls(hinstDLL);
        s_Instance = hinstDLL;
        break;

    case DLL_PROCESS_DETACH:
        if (s_Initialized)
        {
            ::WaitForSingleObject(s_LoadThreadHandle, INFINITE);
            ::CloseHandle(s_LoadThreadHandle);
        }
        break;
    }

    return TRUE;
}