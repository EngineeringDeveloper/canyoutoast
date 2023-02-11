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
	blocked: boolean;
	can_follow: boolean;
	follower_count: number;
	friend_count: number;
	mutual_friend_count: number;
	athlete_type: number;
	date_preference: string;
	measurement_preference: string;
	clubs: Club[];
	ftp: number;
	bikes: Bike[];
	shoes: any[];
	is_winback_via_upload: boolean;
	is_winback_via_view: boolean;
}

export interface Activity {
	resource_state: number;
	athlete: Athlete;
	name: string;
	distance: number;
	moving_time: number;
	elapsed_time: number;
	total_elevation_gain: number;
	type: string;
	sport_type: string;
	workout_type: number;
	id: number;
	start_date: string;
	start_date_local: string;
	timezone: string;
	utc_offset: number;
	location_city: null;
	location_state: null;
	location_country: string;
	achievement_count: number;
	kudos_count: number;
	comment_count: number;
	athlete_count: number;
	photo_count: number;
	map: Map;
	trainer: boolean;
	commute: boolean;
	manual: boolean;
	private: boolean;
	visibility: string;
	flagged: boolean;
	gear_id: string;
	start_latlng: number[];
	end_latlng: number[];
	average_speed: number;
	max_speed: number;
	average_cadence: number;
	average_temp: number;
	average_watts: number;
	max_watts: number;
	weighted_average_watts: number;
	kilojoules: number;
	device_watts: boolean;
	has_heartrate: boolean;
	average_heartrate: number;
	max_heartrate: number;
	heartrate_opt_out: boolean;
	display_hide_heartrate_option: boolean;
	elev_high: number;
	elev_low: number;
	upload_id: number;
	upload_id_str: string;
	external_id: string;
	from_accepted_tag: boolean;
	pr_count: number;
	total_photo_count: number;
	has_kudoed: boolean;
	suffer_score: number;
}

export interface Athlete {
	id: number;
	resource_state: number;
}

export interface Map {
	id: string;
	summary_polyline: string;
	resource_state: number;
}

export interface Bike {
	id: string;
	primary: boolean;
	name: string;
	nickname: string;
	resource_state: number;
	retired: boolean;
	distance: number;
	converted_distance: number;
}

export interface Club {
	id: number;
	resource_state: number;
	name: string;
	profile_medium: string;
	profile: string;
	cover_photo: null | string;
	cover_photo_small: null | string;
	activity_types: string[];
	activity_types_icon: string;
	dimensions: string[];
	sport_type: string;
	city: string;
	state: string;
	country: string;
	private: boolean;
	member_count: number;
	featured: boolean;
	verified: boolean;
	url: string;
	membership: string;
	admin: boolean;
	owner: boolean;
}

type Tuple<T, N extends number> = N extends N
	? number extends N
		? T[]
		: _TupleOf<T, N, []>
	: never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
	? R
    : _TupleOf<T, N, [T, ...R]>;
    
export type binLength = Tuple<number, 11>;