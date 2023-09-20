using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using UserManagementAPI.Models;

namespace UserManagementAPI.Data;

public partial class UserInfoContext : DbContext
{
    public UserInfoContext(DbContextOptions<UserInfoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<UserInfoMaster> UserInfoMasters { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserInfoMaster>(entity =>
        {
            entity.HasKey(e => e.UserId);

            entity.ToTable("UserInfoMaster");

            entity.Property(e => e.UserId).HasColumnName("userId");
            entity.Property(e => e.FirstName).HasColumnName("firstName");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
