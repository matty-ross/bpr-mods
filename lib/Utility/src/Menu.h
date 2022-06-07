#pragma once


#define WIN32_LEAN_AND_MEAN


#include <vector>
#include <mutex>

#include <Windows.h>


namespace Utility {

    class Menu
    {
    private:
        Menu();
        ~Menu();

    public:
        Menu(const Menu&) = delete;
        Menu& operator =(const Menu&) = delete;

        static Menu& Get();
        void AddWindow(void(*windowFunction)());

    private:
        void SetupPlatformBackend();
        void SetupRendererBackend();

        static void Render();
        static LRESULT CALLBACK WindowProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam);

    private:
        WNDPROC m_PreviousWindowProc;
        std::mutex m_WindowFunctionsLock;
        std::vector<void(*)()> m_WindowFunctions;
    };

}