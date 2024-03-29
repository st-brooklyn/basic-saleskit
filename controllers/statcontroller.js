'use strict';

function computeStats(visitorsData) {
    return {
        pages: computePageCounts(visitorsData),
        referrers: computeRefererCounts(visitorsData),
        activeUsers: getActiveUsers(visitorsData)
    };
}

function computePageCounts(visitorsData) {
    // sample data in pageCounts object:
    // { "/": 13, "/about": 5 }
    var pageCounts = {};
    for (var key in visitorsData) {
        var page = visitorsData[key].page;
        if (page in pageCounts) {
            pageCounts[page]++;
        }
        else {
            pageCounts[page] = 1;
        }
    }
    return pageCounts;
}

function computeRefererCounts(visitorsData) {
    // sample data in referrerCounts object:
    // { "http://twitter.com/": 3, "http://stackoverflow.com/": 6 }
    var referrerCounts = {};
    for (var key in visitorsData) {
        var referringSite = visitorsData[key].referringSite || '(direct)';
        if (referringSite in referrerCounts) {
            referrerCounts[referringSite]++;
        }
        else {
            referrerCounts[referringSite] = 1;
        }
    }
    return referrerCounts;
}

// get the total active users on our site
function getActiveUsers(visitorsData) {
    return Object.keys(visitorsData).length;
}

module.exports = {
    computeStats: computeStats
}