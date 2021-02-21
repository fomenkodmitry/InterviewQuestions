namespace Domain.Filter
{
    /// <summary>
    /// Параметры пагинации для фильтрации
    /// </summary>
    public class FilterPagingDto
    {
        /// <summary>
        /// Номер страницы, начиная с нуля
        /// </summary>
        public int PageNumber { get; set; } = 1;
        /// <summary>
        /// Размер страницы, по умолчанию - 20
        /// </summary>
        public int PageSize { get; set; } = 20;
    }
}