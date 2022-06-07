#pragma once


#include <string>


namespace Utility {
    
    enum class LogType
    {
        Info,
        Warning,
        Error
    };

    
    class Logger
    {
    public:
        Logger(const std::string& filePath);

        void Log(LogType logType, const std::string& message) const;
        void Log(LogType logType, const char* format, ...) const;

    private:
        static std::string GetLogType(LogType logType);
        static std::string GetTime();

    private:
        std::string m_FilePath;
    };

}


#define LOG_INFO(instance, ...)       (instance).Log(Utility::LogType::Info, __VA_ARGS__)
#define LOG_WARNING(instance, ...)    (instance).Log(Utility::LogType::Warning, __VA_ARGS__)
#define LOG_ERROR(instance, ...)      (instance).Log(Utility::LogType::Error, __VA_ARGS__)