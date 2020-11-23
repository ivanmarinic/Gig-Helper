using Application.Performers.DTO;
using Application.Sets.DTO;
using Application.Songs.DTO;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Sets.Mapping
{
    public class SetMappingProfile : Profile
    {
        public SetMappingProfile()
        {
            CreateMap<Song, SongDTO>();
            CreateMap<Performer, PerformerDTO>();
            CreateMap<Set, SetDTO>();
            CreateMap<SongSet, SongSetDTO>();
            CreateMap<SongPerformer, SongPerformerDTO>();
            CreateMap<SongSet, SetDTO>();
        }
    }
}
