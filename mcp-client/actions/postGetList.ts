"use server";
import { cmskitServiceBlogPostPublicGetList } from "@/openapi/cmskit";
import { client } from "@/openapi/client";

const postGetList = async (
  slug: string,
  skipCount = 0,
  maxResultCount = 10
) => {
  return await cmskitServiceBlogPostPublicGetList({
    throwOnError: true,
    client: client,
    path: {
      blogSlug: slug,
    },
    query: {
      Sorting: "creationTime desc",
      SkipCount: skipCount,
      MaxResultCount: maxResultCount,
    },
  });
};

export default postGetList;
