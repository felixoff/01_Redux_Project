import * as axios from "axios";

const instance = axios.create ({
    withCredentials:true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers : {"API-KEY":"9ae11b57-4cdd-4fb5-af06-fd57b382582f"}
});

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response=>{
            return response.data;
        })
    },
    follow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.post(`follow/${userId}`)
    },
    getUser(userId) {
        console.warn('Obsolete Method. Please use profileAPI')
        return profileAPI.getUser(userId)
    }
}

export const profileAPI = {
    getUser(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status) {
        return instance.put('profile/status/',{status: status})
    },
    savePhoto(file) {
        const formData = new FormData();
        formData.append("image", file)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile) {
        return instance.put('profile', profile);
    }
}

export const authAPI = {
    me () {
        return instance.get(`auth/me` )
    },
    login (email,password,rememberMe=false, captcha = null) {
        return instance.post(`auth/login` ,{email,password,rememberMe, captcha})
    },
    logout () {
        return instance.delete(`auth/login`)
    }
}

export const captchaAPI = {
    getCaptcha () {
        return instance.get(`security/get-captcha-url` )
    }
}