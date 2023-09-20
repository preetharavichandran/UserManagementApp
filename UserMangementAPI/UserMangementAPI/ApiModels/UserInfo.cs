namespace UserManagementAPI.ApiModels
{
    public class UserInfo
    {
        public int? UserId { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string DateOfBirth { get; set; } = string.Empty;
    }
}

