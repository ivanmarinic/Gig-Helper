import axios, { AxiosResponse } from "axios";
import { ISong, ISongEnvelope } from "../models/songs";
import { ISet, ISetEnvelope } from "../models/set";
import { IPerformer, IPerformerEnvelope } from "../models/performer";
import { toast } from "react-toastify";
import { history } from "../..";
import { IUser, IUserFormValues } from "../models/user";
import { IProfile, IPhoto } from "../models/profile";

axios.defaults.baseURL = "https://localhost:44341/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error!");
  }

  //destructuring so we don't need to write everything
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }

  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }

  if (status === 500) {
    toast.error("Server error");
  }

  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const Songs = {
  list: (limit?: number, page?: number): Promise<ISongEnvelope> =>
    requests.get(`/songs?limit=${limit}&offset=${page ? page * limit! : 0}`),
  details: (id: string) => requests.get(`/songs/${id}`),
  create: (song: ISong) => requests.post(`/songs`, song),
  update: (song: ISong) => requests.put(`/songs/${song.id}`, song),
  delete: (id: string) => requests.del(`/songs/${id}`),
};

const Sets = {
  list: (limit?: number, page?: number): Promise<ISetEnvelope> =>
    requests.get(`/sets?limit=${limit}&offset=${page ? page * limit! : 0}`),
  details: (id: string) => requests.get(`/sets/${id}`),
  create: (set: ISet) => requests.post(`/sets`, set),
  update: (set: ISet) => requests.put(`/sets/${set.id}`, set),
  delete: (id: string) => requests.del(`/sets/${id}`),
};

const Performers = {
  list: (limit?: number, page?: number): Promise<IPerformerEnvelope> =>
    requests.get(
      `/performers?limit=${limit}&offset=${page ? page * limit! : 0}`
    ),
  details: (id: string) => requests.get(`/performers/${id}`),
  create: (performer: IPerformer) => requests.post(`/performers`, performer),
  update: (performer: IPerformer) =>
    requests.put(`/performers/${performer.id}`, performer),
  delete: (id: string) => requests.del(`/performers/${id}`),
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
  fbLogin: (accessToken: string) =>
    requests.post(`/user/facebook`, { accessToken }),
};

const Profiles = {
  get: (username: string): Promise<IProfile> =>
    requests.get(`/profiles/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> =>
    requests.postForm(`/photos`, photo),
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.del(`/photos/${id}`),
};

export default {
  Songs,
  Sets,
  Performers,
  User,
  Profiles,
};
