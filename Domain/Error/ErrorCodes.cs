namespace Domain.Error
{
    public enum ErrorCodes
    {
        RequiredFieldsMissing = 1,
        WrongId,
        WrongFormat,
        NotFound,
        WrongType,
        YouAreBlocked,
        UserIsBlocked,
        UserEmailExists,
        IncorrectEmailOrPassword,
        WrongOperation
    }
}