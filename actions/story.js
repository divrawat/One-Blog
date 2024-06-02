import { DOMAIN } from '../config';

export const createwebstory = async (story, token) => {
    try {
        const response = await fetch(`${DOMAIN}/api/web-stories/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: story,
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};


export const singleStory = async (slug) => {
    try {
        const response = await fetch(`${DOMAIN}/api/web-stories/${slug}`, {
            method: 'GET'
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};


export const list = async (page, search, token) => {
    try {
        const response = await fetch(`${DOMAIN}/api/web-stories/allwebstories?page=${page}&search=${search}`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}




export const webstoryslugs = async () => {
    try {
        const response = await fetch(`${DOMAIN}/api/web-stories/webstoryslugs`, {
            method: 'GET'
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};


export const DeleteStory = async (slug, token) => {

    try {
        const response = await fetch(`${DOMAIN}/api/web-stories/${slug}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};



export const updateStory = async (story, token, slug) => {

    try {
        const response = await fetch(`${DOMAIN}/api/web-stories/${slug}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: story
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};


export const draftlist = async (page, search, token) => {
    try {
        const response = await fetch(`${DOMAIN}/api/web-stories/allwebstories-draft?page=${page}&search=${search}`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}









export const updateAllToDraft = async (token) => {
    try {
        const response = await fetch(`${DOMAIN}/api/web-stories/bulk-update-stories-draft`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return { success: false, message: 'Failed to update all articles to "draft" status.' };
    }
};



export const updateAllToPublish = async (token) => {
    try {
        const response = await fetch(`${DOMAIN}/api/web-stories/bulk-update-stories-publish`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return { success: false, message: 'Failed to update all articles to "draft" status.' };
    }
};