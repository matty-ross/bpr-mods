#pragma once


#include <string>


namespace BP {

    class CgsID
    {
    public:
        CgsID(uint64_t id);
        CgsID(const char* string);

        uint64_t GetCompressed() const;
        const std::string& GetUncompressed() const;

    private:
        uint64_t m_Compressed;
        std::string m_Uncompressed;
    };

}