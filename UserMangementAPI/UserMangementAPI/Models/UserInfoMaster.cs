using System;
using System.Collections.Generic;

namespace UserManagementAPI.Models;

public partial class UserInfoMaster
{
    public long UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string DateOfBirth { get; set; } = null!;
}
