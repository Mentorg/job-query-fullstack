import { AxiosError } from "axios";
import axiosInstance from "./axiosConfig";
import { UpdateSubscription } from "../types/subscription";
import { Billing } from "../types/billing";
import { PaymentMethod } from "../types/payment_method";

// index
export const getCompanies = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/companies");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching companies failed!");
    }
  }
};

// store
export const createCompany = async (companyData: FormData) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/companies`,
      companyData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Creating company failed!");
    }
  }
};

// update
export const updateCompany = async (
  companyId: number,
  companyData: FormData,
) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/company/${Number(companyId)}`,
      companyData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Updating company data failed!");
    }
  }
};

// delete
export const deleteCompany = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/companies/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Deleting data failed!");
    }
  }
};

// company jobs
export const getCompanyJobs = async (companyId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/company/${companyId}/jobs`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching company's jobs failed!");
    }
  }
};

// company recruiters
export const getCompanyRecruiters = async (companyId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/company/${companyId}/recruiters`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching company's recruiters failed!");
    }
  }
};

// company locations
export const getCompanyLocations = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/company/locations`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching company's locations failed!");
    }
  }
};

// update company locations
export const updateCompanyLocations = async (
  locationData: number[],
  id: number,
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/company/${Number(id)}/locations`,
      locationData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Updating company location data failed!",
      );
    }
  }
};

// get company subscription plan
export const getCompanySubscription = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/companies/subscription`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Fetching company subscription data failed!",
      );
    }
  }
};

// update company subscription plan
export const updateCompanySubscription = async (
  subscriptionData: UpdateSubscription,
  companyId: number,
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/company/${Number(companyId)}/subscriptions`,
      subscriptionData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Updating company's subscription plan failed!",
      );
    }
  }
};

// get company billing settings
export const getCompanyBillingSettings = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/companies/billingSettings`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Fetching company's billing settings failed!",
      );
    }
  }
};

// update company billing settings
export const updateCompanyBillingSettings = async (
  billingSettingsData: Partial<Billing>,
  id: number,
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/company/${Number(id)}/billingSetting`,
      billingSettingsData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Updating billing settings failed!");
    }
  }
};

// get company payment methods
export const getCompanyPaymentMethods = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/companies/paymentMethods`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Fetching company's payment methods data failed!",
      );
    }
  }
};

// store company payment method
export const createCompanyPaymentMethod = async (
  paymentMethodData: PaymentMethod,
) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/company/paymentMethod`,
      paymentMethodData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Creating new payment method failed!");
    }
  }
};

// update company's payment method
export const updateCompanyPaymentMethod = async (
  paymentMethodData: PaymentMethod,
  paymentMethodId: number,
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/company/paymentMethod/{payment}/${Number(paymentMethodId)}`,
      paymentMethodData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Updating payment method data failed!");
    }
  }
};

// delete company's payment method
export const deleteCompanyPaymentMethod = async (paymentMethodId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/company/paymentMethod/${paymentMethodId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Deleting company's payment method data failed!",
      );
    }
  }
};

// set company's default payment method
export const setCompanyDefaultPaymentMethod = async (
  paymentMethodData: Partial<PaymentMethod>,
  paymentMethodId: number,
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/company/paymentMethod/${Number(paymentMethodId)}/default`,
      paymentMethodData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Updating default payment method failed!",
      );
    }
  }
};
