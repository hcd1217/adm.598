import { api } from '@/utils/api';

export async function login(form: TLoginForm) {
  // const response = await api.post<LoginData>(`/auth/login`, form);
  // return response.data.data;
  let token = null
  if (form.email === "viet@mailinator.com" && form.password === "123456@aA") {
    token = "123456"
    return Promise.resolve({ token })
  }
  return Promise.reject({ token })
}

type RegisterData = ApiResponse<{
  token: string;
}>;

export async function register(form: any) {
  const response = await api.post<RegisterData>(`/auth/register`, form);
  return response.data.data;
}


export async function identify() {
  // const response = await api.get<ApiResponse<any>>(`/auth/me`);
  // return response.data.data;
  if (Boolean(localStorage.token)) {
    return Promise.resolve({
      success: true,
      statusCode: 200,
      data: {
        name: "Viet Ho",
        email: "viet@mailinator.com",
        token: "123232"
      }
    })
  } else {
    return Promise.reject({
      success: false,
      statusCode: 400,
    })
  }
}
