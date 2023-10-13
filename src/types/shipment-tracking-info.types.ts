export type ShipmentStore = {
	loading: boolean;
	data: ShipmentTrackingInfo | null;
	state?: "created" | "suspended" | "delivered";
};

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
	state: TransitEventState;
	timestamp: string;
	hub?: string;
	exceptionCode?: string;
	reason?: string;
};

export type TransitEventState =
	| "TICKET_CREATED"
	| "PACKAGE_RECEIVED"
	| "NOT_YET_SHIPPED"
	| "IN_TRANSIT"
	| "OUT_FOR_DELIVERY"
	| "DELIVERED"
	| "CANCELLED"
	| "WAITING_FOR_CUSTOMER_ACTION";

export type WorkingDay = {
	dayDate: string;
	dayName: string;
};
