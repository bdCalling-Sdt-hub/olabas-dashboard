import { api } from "../api/baseApi";

const conactSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateContact: builder.mutation({
      query: (data) => ({
        url: `/company-cms/contact`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),

    getContact: builder.query({
      query: () => ({
        url: `/company-cms/contact`,
        method: "GET",
      }),
      providesTags: ["Contact"],
    }),

    getContactList: builder.query({
      query: ({ page, limit }) => ({
        url: `/contact?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Contact"],
    }),
  }),
});

export const {
  useUpdateContactMutation,
  useGetContactQuery,
  useGetContactListQuery,
} = conactSlice;
