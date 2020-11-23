using Application.Performers.DTO;
using Application.Sets.DTO;
using Application.Songs.DTO;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Performers.Mapping
{
    public class PerformerMappingProfile : Profile
    {
        public PerformerMappingProfile()
        {
            CreateMap<Song, SongDTO>();
            CreateMap<Performer, PerformerDTO>();
            CreateMap<Set, SetDTO>();
            CreateMap<SongSet, SongSetDTO>();
            CreateMap<SongPerformer, SongPerformerDTO>();
        }
    }
}
