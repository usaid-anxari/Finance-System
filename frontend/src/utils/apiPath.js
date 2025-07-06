export const BASE_URL =`http://localhost:${5000 || 8080}`

// utils/api.paths.js
export const API_PATHS = {
    AUTH:{
        LOGIN:"/api/v1/auth/login",
        REGSITER:"/api/v1/auth/register",
        GET_USER_INFO:"/api/v1/auth/getuser",
    },
    DASHBOARD:{
        GET_DATA:"/api/v1/dashboard"
    },
    INCOME:{
        ADD_INCOME:"/api/v1/income/add",
        GET_INCOME:"/api/v1/income/get",
        DELETE_INCOME:(income_id)=>`/api/v1/income/delete/${income_id}`,
        DOWNLOAD_INCOME_REPORT:"/api/v1/income/download-report"
    },
    EXPENSE:{
        ADD_EXPENSE:"/api/v1/expense/add",
        GET_EXPENSE:"/api/v1/expense/get",
        DELETE_EXPENSE:(expense_id)=>`/api/v1/expense/delete/${expense_id}`,
        DOWNLOAD_EXPENSE_REPORT:"/api/v1/expense/download-report"
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/v1/auth/upload-image"
    }

}