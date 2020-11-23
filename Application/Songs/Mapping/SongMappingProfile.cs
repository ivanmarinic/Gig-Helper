using Application.Performers.DTO;
using Application.Sets.DTO;
using Application.Songs.DTO;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Songs.Mapping
{
    public class SongMappingProfile : Profile
    {
        public SongMappingProfile()
        {
            CreateMap<Song, SongDTO>();
            CreateMap<Performer, PerformerDTO>();
            CreateMap<Set, SetDTO>();
            CreateMap<SongSet, SongSetDTO>();
            CreateMap<SongPerformer, SongPerformerDTO>();
            CreateMap<SongSetDTO, SetDTO>();
        }
    }
}
