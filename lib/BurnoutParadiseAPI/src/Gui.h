#pragma once


#include <string>


namespace BP {

    class HudMessage
    {
    public:
        HudMessage() = default;
        HudMessage(const std::string& title, const std::string& text);

        void Display();
        void SetTitle(const std::string& title);
        void SetText(const std::string& text);

    private:
        std::string m_Title;
        std::string m_Text;
    };

}