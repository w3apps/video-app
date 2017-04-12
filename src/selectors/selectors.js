import { createSelector } from 'reselect'

const videosSelector = (state, videoList) => state[videoList]; // select either the searchedVideos or myVideos
const filterCategoryId = state => state.filters.categoryId;
const filterStartYear = state => state.filters.startYear;
const filterEndYear = state => state.filters.endYear;

// Selector used for filtering the videos based on the state filters
export const getVisibleVideos = createSelector(
    [videosSelector, filterCategoryId, filterStartYear, filterEndYear],
    (items, filterCategoryId, filterStartYear, filterEndYear) => {

        // TODO: improve the below filter checks to reduce code duplication
        // apply all filters, category and year range
        if (filterCategoryId && filterStartYear && filterEndYear) {
            return items.filter((item) => {
                const videoYear = new Date(item.snippet.publishedAt).getFullYear();
                return (item.snippet.categoryId === filterCategoryId && videoYear >= filterStartYear && videoYear <= filterEndYear);
            });
        }
        // apply only category filter in case year range is not set
        else if (filterCategoryId) {
            return items.filter((item) => {
                return (item.snippet.categoryId === filterCategoryId);
            });
        }
        // apply only year range filter in case category is not set
        else if (filterStartYear && filterEndYear) {
            return items.filter((item) => {
                const videoYear = new Date(item.snippet.publishedAt).getFullYear();
                return (videoYear >= filterStartYear && videoYear <= filterEndYear);
            });
        }

        // if none of the above filters apply, returned all the videos
        return items;

    }
);
