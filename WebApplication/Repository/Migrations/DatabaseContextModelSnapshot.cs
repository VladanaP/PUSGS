﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Repository;

namespace Repository.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("Domain.Article", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Ingredients")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<double>("Price")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.ToTable("Article");

                    b.HasData(
                        new
                        {
                            Id = -1,
                            Ingredients = "smth",
                            Name = "Pizza",
                            Price = 250.0
                        },
                        new
                        {
                            Id = -2,
                            Ingredients = "smth",
                            Name = "Vine",
                            Price = 250.0
                        });
                });

            modelBuilder.Entity("Domain.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<string>("Comment")
                        .HasColumnType("text");

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer");

                    b.Property<int>("DelivererId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<double>("Price")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.ToTable("Order");

                    b.HasData(
                        new
                        {
                            Id = -1,
                            Address = "Novi Sad",
                            Comment = "Ring",
                            CustomerId = -3,
                            DelivererId = 0,
                            EndTime = new DateTime(2022, 6, 25, 15, 5, 0, 0, DateTimeKind.Unspecified),
                            Price = 500.0,
                            StartTime = new DateTime(2022, 6, 25, 15, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = -2,
                            Address = "Novi Sad",
                            Comment = "Ring",
                            CustomerId = -3,
                            DelivererId = -2,
                            EndTime = new DateTime(2022, 6, 25, 15, 5, 0, 0, DateTimeKind.Unspecified),
                            Price = 250.0,
                            StartTime = new DateTime(2022, 6, 25, 15, 0, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("Domain.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<bool>("Approved")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Image")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("Surname")
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("User");

                    b.HasData(
                        new
                        {
                            Id = -1,
                            Address = "Novi Sad",
                            Approved = true,
                            DateOfBirth = new DateTime(2022, 6, 25, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "admin@gmail.com",
                            Image = "",
                            Name = "John",
                            Password = "$2a$10$UVn74F/yEiUzKWBSGVyzHe2UfpVJ95zY50Q8bz1RFyrAYVfwFAj4i",
                            Role = 2,
                            Status = 1,
                            Surname = "Doe",
                            Username = "admin"
                        },
                        new
                        {
                            Id = -2,
                            Address = "Novi Sad",
                            Approved = false,
                            DateOfBirth = new DateTime(2022, 6, 25, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "deliverer@gmail.com",
                            Image = "",
                            Name = "John",
                            Password = "$2a$10$UVn74F/yEiUzKWBSGVyzHe2UfpVJ95zY50Q8bz1RFyrAYVfwFAj4i",
                            Role = 1,
                            Status = 0,
                            Surname = "Doe",
                            Username = "deliverer"
                        },
                        new
                        {
                            Id = -3,
                            Address = "Novi Sad",
                            Approved = true,
                            DateOfBirth = new DateTime(2022, 6, 25, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "customer@gmail.com",
                            Image = "",
                            Name = "John",
                            Password = "$2a$10$UVn74F/yEiUzKWBSGVyzHe2UfpVJ95zY50Q8bz1RFyrAYVfwFAj4i",
                            Role = 0,
                            Status = 1,
                            Surname = "Doe",
                            Username = "customer"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
