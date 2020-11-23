using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore.Internal;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Ivan",
                        UserName = "ivan",
                        Email = "ivan@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Stjepan",
                        UserName = "stjepan",
                        Email = "stjepan@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Antun",
                        UserName = "antun",
                        Email = "antun@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Songs.Any())
            {
                List<Song> songs = new List<Song>
                {
                    new Song
                    {
                        Id = Guid.NewGuid(),
                        Name = "Moja juliska",
                        Genre = Genre.Tambura,
                        Text = "Kad se sjetim ja, moja Juliska",
                    }
                };
                context.Songs.AddRange(songs);
                //await context.Songs.AddRangeAsync(songs);
                context.SaveChanges();
                //await context.SaveChangesAsync();

            }

            if (!context.Performers.Any())
            {
                List<Performer> performers = new List<Performer>
                {
                    new Performer
                    {
                        Id = Guid.NewGuid(),
                        Name = "Miroslav Skoro",
                    }
                };

                context.Performers.AddRange(performers);

                //await context.Performers.AddRangeAsync(performers);
                context.SaveChanges();
                //await context.SaveChangesAsync();

            }

            if (!context.Sets.Any())
            {
                List<Set> sets = new List<Set>
                {
                    new Set
                    {
                        Id = Guid.NewGuid(),
                        Name = "Miroslav Skoro"
                    }
                };

                context.Sets.AddRange(sets);

                context.SaveChanges();

            }
        }
    }
}
