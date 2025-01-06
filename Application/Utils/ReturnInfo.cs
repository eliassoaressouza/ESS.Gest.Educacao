namespace Application.Utils
{

    public class ReturnInfo<T> 
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public T Item { get; set; }
        public IList<T> Items { get; set; }
        public Exception Exception { get; set; }
        public ReturnInfo()
        {
            Status = true;
        }
    }
}
