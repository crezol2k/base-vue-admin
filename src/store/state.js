import { getAuth, getCurentUser } from "../util/auth";

const api_token = getAuth()?.api_token;
const currentUser = {
  activated: true,
  authorities: ["ROLE_USER"],
  createdBy: "hungndk",
  createdDate: "2023-06-22T07:49:20.023055Z",
  email: "dangnv@stdio.asia",
  firstName: "Van",
  id: 1056,
  imageUrl: null,
  langKey: "en",
  lastModifiedBy: "hungndk",
  lastModifiedDate: "2023-06-22T07:49:20.023055Z",
  lastName: "Dang",
  login: "dangnv",
};
const state = {
  sideBar: {
    show: true,
  },
  eventDetail: {},
  login: {
    isLoading: false,
    isLogged: api_token ? true : false,
  },
  user: {
    data: currentUser || null,
  },
  listEvents: {
    isLoading: false,
    data: [],
  },
  popup: {
    showModalCreateEvent: false,
    showModalUpdateEvent: false,
    showModalDetailEvent: false,
  },
  listUsers: {
    isLoading: false,
    data: [],
    dataFilter: [],
  },
};
export default state;
