#include "pch.h"
#include "Menu.h"

#include "ImGui.h"

#include "Exception.h"
#include "Pointer.h"
#include "Detour.h"


namespace Utility {

    Menu::Menu()
        :
        m_PreviousWindowProc(nullptr)
    {
        IMGUI_CHECKVERSION();
        ImGui::CreateContext();
        ImGui::StyleColorsClassic();

        SetupPlatformBackend();
        SetupRendererBackend();
    }

    Menu::~Menu()
    {
        ImGui_ImplDX11_Shutdown();
        ImGui_ImplWin32_Shutdown();

        ImGui::DestroyContext();
    }

    Menu& Menu::Get()
    {
        static Menu instance;
        return instance;
    }

    void Menu::AddWindow(void(*windowFunction)())
    {
        Get().m_WindowFunctionsLock.lock();
        m_WindowFunctions.push_back(windowFunction);
        Get().m_WindowFunctionsLock.unlock();
    }

    void Menu::SetupPlatformBackend()
    {
        const HWND windowHandle = Pointer(0x0139815C).As<HWND>();
        if (windowHandle == nullptr)
        {
            throw EXCEPTION("Failed to setup a platform backend, because the Window Handle is null.");
        }

        ImGui_ImplWin32_Init(windowHandle);

        const LONG_PTR newWindowProc = Pointer(WindowProc).GetAddress<LONG_PTR>();
        const WNDPROC previousWindowProc = Pointer(::SetWindowLongPtrA(windowHandle, GWLP_WNDPROC, newWindowProc)).GetAddress<WNDPROC>();
        if (previousWindowProc == nullptr)
        {
            throw WINDOWS_EXCEPTION("Failed to setup a platform backend, because the previous WindowProc is null.");
        }

        m_PreviousWindowProc = previousWindowProc;
    }

    void Menu::SetupRendererBackend()
    {
        ID3D11Device* const d3d11Device = Pointer(0x01485BF8).As<ID3D11Device*>();
        if (d3d11Device == nullptr)
        {
            throw EXCEPTION("Failed to setup a renderer backend, because the D3D11 Device is null.");
        }

        ID3D11DeviceContext* const d3d11DeviceContext = Pointer(0x01485ECC).As<ID3D11DeviceContext*>();
        if (d3d11DeviceContext == nullptr)
        {
            throw EXCEPTION("Failed to setup a renderer backend, because the D3D11 Device Context is null.");
        }

        ImGui_ImplDX11_Init(d3d11Device, d3d11DeviceContext);

        const DetourConfig config =
        {
            .HookAddress = 0x0817E440,
            .HookSize = 6,
            .DetourFunction = Render,
            .PreserveFlags = true,
            .PreserveRegisters = true,
            .KeepOriginalCode = true
        };
        Utility::Detour(config).Install();
    }

    void Menu::Render()
    {
        ImGui_ImplDX11_NewFrame();
        ImGui_ImplWin32_NewFrame();
        ImGui::NewFrame();

        Get().m_WindowFunctionsLock.lock();
        for (const auto windowFunction : Get().m_WindowFunctions)
        {
            windowFunction();
        }
        Get().m_WindowFunctionsLock.unlock();

        ImGui::Render();
        ImGui_ImplDX11_RenderDrawData(ImGui::GetDrawData());
    }

    LRESULT Menu::WindowProc(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam)
    {
        if (ImGui_ImplWin32_WndProcHandler(hWnd, Msg, wParam, lParam))
        {
            return 1;
        }

        const ImGuiIO& io = ImGui::GetIO();
        switch (Msg)
        {
        case WM_MOUSEMOVE:
        case WM_LBUTTONDOWN:
        case WM_LBUTTONUP:
        case WM_MOUSEWHEEL:
            if (io.WantCaptureMouse)
            {
                Pointer(0x013FC2A8).As<float>() = -1.0f;
                Pointer(0x01398244).As<float>() = -1.0f;
                Pointer(0x01398243).As<bool>() = false;
                Pointer(0x01398248).As<float>() = 0.0f;
                return 0;
            }
            break;

        case WM_KEYDOWN:
        case WM_CHAR:
            if (Pointer(0x013FC8E0).As<void*>() != nullptr)
            {
                Pointer(0x013FC8E0).Field(0x71BF00).As<bool>() = !io.WantCaptureKeyboard;
            }
            break;
        }

        return ::CallWindowProcA(Get().m_PreviousWindowProc, hWnd, Msg, wParam, lParam);
    }

}