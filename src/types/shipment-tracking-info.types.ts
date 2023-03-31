export type ShipmentTrackingInfo = {
	provider: string;
	CurrentStatus: TransitEvent;
	PromisedDate: string;
	TrackingNumber: string;
	TrackingURL: string;
	SupportPhoneNumbers: string[];
	TransitEvents: TransitEvent[];
	CreateDate: string;
	isEditableShipment: boolean;
	exceptionCode: number;
	nextWorkingDay: WorkingDay[];
};

export type TransitEvent = {
	state: string;
	timestamp: string;
	hub?: string;
	exceptionCode?: string;
	reason?: string;
};

export type WorkingDay = {
	dayDate: string;
	dayName: string;
};
