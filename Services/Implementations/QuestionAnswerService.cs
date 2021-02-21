﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Filter;
using Domain.QuestionAnswer;
using Domain.Tag;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Services.Implementations
{
    public class QuestionAnswerService : IQuestionAnswerService
    {
        private readonly IGenericRepository _genericRepository;
        private readonly IMapper _mapper;

        public QuestionAnswerService(IGenericRepository genericRepository, IMapper mapper)
        {
            _genericRepository = genericRepository;
            _mapper = mapper;
        }

        public FilteredItemsDto<QuestionAnswerViewDto> Get(QuestionAnswerFilter filter)
        {
            
            var query = _genericRepository.Get<QuestionAnswerModel>()
                .Include(p => p.TagIds)
                .AsQueryable();
            
            if (filter.TagIds != null)
                query = query.Where(p => p.TagIds.Any(x => filter.TagIds.Contains(x.TagId)));
          
            if (!string.IsNullOrEmpty(filter.SearchText))
                query = query.Where(p =>
                    EF.Functions.ILike(p.Question, $"%{filter.SearchText}%")
                    ||
                    EF.Functions.ILike(p.Answer, $"%{filter.SearchText}%")
                );
            
            return new FilteredItemsDto<QuestionAnswerViewDto>()
            {
                Items = query.ApplyPaging(filter.Paging).ProjectTo<QuestionAnswerViewDto>(_mapper.ConfigurationProvider),
                Paging = new FilteredItemsCountDto(query.Count(), filter.Paging?.PageSize ?? 20)
            };
        }

        public async Task<QuestionAnswerModel> Create(QuestionAnswerCreateDto model)
        {
            return await _genericRepository.Create(new QuestionAnswerModel()
            {
                Question = model.Question,
                Answer = model.Answer,
                IsActive = true,
                IsDelete = false,
                TagIds = model.TagIds.Select(p => new QuestionAnswerToTagModel()
                {
                    TagId = p,
                }).ToList()
            });
        }
    }
}