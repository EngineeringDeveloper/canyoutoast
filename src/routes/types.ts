// Generated by https://quicktype.io
export interface Athlete {
	id: number;
	username: null | string;
	resource_state: number;
	firstname: string;
	lastname: string;
	bio: string;
	city: string;
	state: string;
	country: string;
	sex: string;
	premium: boolean;
	summit: boolean;
	created_at: string;
	updated_at: string;
	badge_type_id: number;
	weight: number;
	profile_medium: string;
	profile: string;
	friend: null;
	follower: null;
}


export interface fullAthlete extends Athlete {
    blocked:                boolean;
    can_follow:             boolean;
    follower_count:         number;
    friend_count:           number;
    mutual_friend_count:    number;
    athlete_type:           number;
    date_preference:        string;
    measurement_preference: string;
    clubs:                  Club[];
    ftp:                    number;
    bikes:                  Bike[];
    shoes:                  any[];
    is_winback_via_upload:  boolean;
    is_winback_via_view:    boolean;
}

export interface Bike {
    id:                 string;
    primary:            boolean;
    name:               string;
    nickname:           string;
    resource_state:     number;
    retired:            boolean;
    distance:           number;
    converted_distance: number;
}

export interface Club {
    id:                  number;
    resource_state:      number;
    name:                string;
    profile_medium:      string;
    profile:             string;
    cover_photo:         null | string;
    cover_photo_small:   null | string;
    activity_types:      string[];
    activity_types_icon: string;
    dimensions:          string[];
    sport_type:          string;
    city:                string;
    state:               string;
    country:             string;
    private:             boolean;
    member_count:        number;
    featured:            boolean;
    verified:            boolean;
    url:                 string;
    membership:          string;
    admin:               boolean;
    owner:               boolean;
}