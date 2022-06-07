#include "pch.h"
#include "Exception.h"


namespace Utility {
    
    Exception::Exception(const std::string& description, const std::string& file, int line, const std::string& function)
        :
        m_Description(description),
        m_File(file.substr(file.find_last_of("/\\") + 1)),
        m_Line(std::to_string(line)),
        m_Function(function),
        m_Details("No additional details.")
    {
    }

    std::string Exception::GetSummary() const
    {
        std::stringstream ss;
        
        ss << "[Description] " << GetDescription() << std::endl;
        ss << std::endl;
        ss << "[File] " << GetFile() << std::endl;
        ss << "[Line] " << GetLine() << std::endl;
        ss << "[Function] " << GetFunction() << std::endl;
        ss << std::endl;
        ss << "[Details] " << std::endl;
        ss << GetDetails();

        return ss.str();
    }

    const std::string& Exception::GetDescription() const
    {
        return m_Description;
    }

    const std::string& Exception::GetFile() const
    {
        return m_File;
    }

    const std::string& Exception::GetLine() const
    {
        return m_Line;
    }

    const std::string& Exception::GetFunction() const
    {
        return m_Function;
    }

    const std::string& Exception::GetDetails() const
    {
        return m_Details;
    }

    
    WindowsException::WindowsException(const std::string& description, const std::string& file, int line, const std::string& function)
        :
        Exception(description, file, line, function),
        m_LastError(::GetLastError())
    {
        std::stringstream ss;
        
        ss << "[Error Code] " << GetErrorCode() << std::endl;
        ss << "[Error Message] " << GetErrorMessage();

        m_Details = ss.str();
    }

    std::string WindowsException::GetErrorCode() const
    {
        return std::to_string(m_LastError);
    }

    std::string WindowsException::GetErrorMessage() const
    {
        char buffer[1024] = {};
        ::FormatMessageA(FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS, nullptr, m_LastError, 0, buffer, sizeof(buffer), nullptr);

        return buffer;
    }

}