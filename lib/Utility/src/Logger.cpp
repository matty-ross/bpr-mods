#include "pch.h"
#include "Logger.h"


namespace Utility {

    Logger::Logger(const std::string& filePath)
        :
        m_FilePath(filePath)
    {
    }

    void Logger::Log(LogType logType, const std::string& message) const
    {
        std::ofstream logFile(m_FilePath, std::ios_base::app);
        
        logFile << GetTime() << "  ";
        logFile << GetLogType(logType) << "  ";
        logFile << message;
        logFile << std::endl;

        logFile.close();
    }

    void Logger::Log(LogType logType, const char* format, ...) const
    {
        va_list args = nullptr;
        char buffer[1024] = {};
        
        va_start(args, format);
        vsprintf_s(buffer, format, args);
        va_end(args);

        Log(logType, std::string(buffer));
    }

    std::string Logger::GetLogType(LogType logType)
    {
        switch (logType)
        {
        case LogType::Info:
            return "[Info]";

        case LogType::Warning:
            return "[Warning]";

        case LogType::Error:
            return "[Error]";
        }

        return std::string();
    }

    std::string Logger::GetTime()
    {
        SYSTEMTIME time = {};
        ::GetLocalTime(&time);

        char buffer[32] = {};
        sprintf_s(buffer, "%02d.%02d.%04d %02d:%02d:%02d:%04d", time.wDay, time.wMonth, time.wYear, time.wHour, time.wMinute, time.wSecond, time.wMilliseconds);

        return buffer;
    }

}