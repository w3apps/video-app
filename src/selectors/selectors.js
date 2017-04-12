import { createSelector } from 'reselect'

const videosSelector = state => state.searchedVideos;
const filterCategoryId = state => state.filters.categoryId;
const filterStartYear = state => state.filters.startYear;
const filterEndYear = state => state.filters.endYear;

export const getVisibleVideos = createSelector(
    [videosSelector, filterCategoryId, filterStartYear, filterEndYear],
    (items, filterCategoryId, filterStartYear, filterEndYear) => {

        if (filterCategoryId && filterStartYear && filterEndYear) {
            return items.filter((item) => {
                const videoYear = new Date(item.snippet.publishedAt).getFullYear();
                return (item.snippet.categoryId === filterCategoryId && videoYear >= filterStartYear && videoYear <= filterEndYear);
            });
        }
        else if (filterCategoryId) {
            return items.filter((item) => {
                return (item.snippet.categoryId === filterCategoryId);
            });
        }
        else if (filterStartYear && filterEndYear) {
            return items.filter((item) => {
                const videoYear = new Date(item.snippet.publishedAt).getFullYear();
                return (videoYear >= filterStartYear && videoYear <= filterEndYear);
            });
        }

        return items;

    }
);
