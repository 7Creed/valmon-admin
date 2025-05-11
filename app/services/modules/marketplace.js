// composables/api/modules/users.js
import { useBaseApi } from "../baseApi";

export const MarketplaceController = () => {
	const { get, post, put, del } = useBaseApi();

	//
	const getListingById = (id) => get(`marketplace/listings/${id}`);
	const getFeaturedListings = () => get(`marketplace/featured-listings`);
	const getPublicFeaturedListings = () => get(`get/featured-listings`);
	const getListingCategories = () => get(`marketplace/categories`);
	const getPublicListingCategories = () => get(`get/marketplace/categories`);
	const getAppListing = (params, auth = true) => {
		let url = auth ? "marketplace/listings?" : "get/marketplace/listings?";
		let paramList = [];
		Object.keys(params).forEach((key) => {
			params[key] && paramList.push(`${key}=${params[key]}`);
		});
		return get(url + paramList.join("&"));
	};

	return {
		getListingById,
		getFeaturedListings,
		getPublicFeaturedListings,
		getListingCategories,
		getPublicListingCategories,
		getAppListing,
	};
};
