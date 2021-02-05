using System;

namespace Domain.Article
{
    [Flags]
    public enum Tag
    {
        Csharp = 1,
        HighLoad = 2,
        Sql = 3,
        Postgresql = 4
    }
}