#include "Gui.h"


namespace BP {

    HudMessage::HudMessage(const std::string& title, const std::string& text)
        :
        m_Title(title),
        m_Text(text)
    {
    }

    void HudMessage::Display()
    {
        struct Params
        {
            char Title[64];
            char Text[64];
        };

        Params params = {};
        strcpy_s(params.Title, m_Title.c_str());
        strcpy_s(params.Text, m_Text.c_str());

        __asm
        {
            lea eax, [params]
            push eax

            mov ecx, dword ptr ds:[0x013FC8E0]
            add ecx, 0x8216D0

            mov eax, 0x0091A4A0
            call eax
        }
    }

    void HudMessage::SetTitle(const std::string& title)
    {
        m_Title = title;
    }

    void HudMessage::SetText(const std::string& text)
    {
        m_Text = text;
    }

}