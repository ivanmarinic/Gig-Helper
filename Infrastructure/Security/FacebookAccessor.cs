﻿using Application.Interfaces;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public class FacebookAccessor : IFacebookAccessor
    {
        private readonly HttpClient httpClient;
        private readonly IOptions<FacebookAppSettings> config;

        public FacebookAccessor(IOptions<FacebookAppSettings> config)
        {
            this.config = config;

            httpClient = new HttpClient
            {
                BaseAddress = new System.Uri("https://graph.facebook.com/")
            };

            httpClient.DefaultRequestHeaders
                .Accept
                .Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<FacebookUserInfo> FacebookLogin(string accessToken)
        {
            // verify that token is valid
            var verifyToken = await httpClient
                .GetAsync($"debug_token?input_token={accessToken}&access_token={config.Value.AppId}|{config.Value.AppSecret}");

            if (!verifyToken.IsSuccessStatusCode)
                return null;

            var result = await GetAsnyc<FacebookUserInfo>(accessToken, "me", "fields=name,email,picture.width(100).height(100)");

            return result;
        }

        private async Task<T> GetAsnyc<T>(string accessToken, string endpoint, string args)
        {
            var response = await httpClient.GetAsync($"{endpoint}?access_token={accessToken}&{args}");

            if (!response.IsSuccessStatusCode)
                return default(T);

            var result = await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<T>(result);
        }
    }
}
