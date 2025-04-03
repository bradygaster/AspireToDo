namespace TodoAPI.Models;

public class Todo
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public bool IsComplete { get; set; }
    public DateTime? DateCompleted { get; set; }
}