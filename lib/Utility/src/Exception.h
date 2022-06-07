#pragma once


#include <string>


namespace Utility {

    class Exception
    {
    public:
        Exception(const std::string& description, const std::string& file, int line, const std::string& function);

        std::string GetSummary() const;
        const std::string& GetDescription() const;
        const std::string& GetFile() const;
        const std::string& GetLine() const;
        const std::string& GetFunction() const;
        const std::string& GetDetails() const;

    protected:
        std::string m_Description;
        std::string m_File;
        std::string m_Line;
        std::string m_Function;
        std::string m_Details;
    };


    class WindowsException : public Exception
    {
    public:
        WindowsException(const std::string& description, const std::string& file, int line, const std::string& function);

    private:
        std::string GetErrorCode() const;
        std::string GetErrorMessage() const;

    private:
        uint32_t m_LastError;
    };

}


#define EXCEPTION(description)            Utility::Exception(description, __FILE__, __LINE__, __FUNCTION__)
#define WINDOWS_EXCEPTION(description)    Utility::WindowsException(description, __FILE__, __LINE__, __FUNCTION__)