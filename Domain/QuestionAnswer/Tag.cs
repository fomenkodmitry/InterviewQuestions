using System;

namespace Domain.QuestionAnswer
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