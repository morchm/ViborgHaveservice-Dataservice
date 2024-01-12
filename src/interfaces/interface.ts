interface ModifyRequest {
  message: string;
}

// ---------- ABOUT INTERFACES ----------
export interface AboutUs {
  _id: string;
  title: string;
  content: string;
}

export interface AboutUsPUT extends ModifyRequest {
  about: AboutUs;
}

// ---------- SERVICES INTERFACES ----------
export interface ServicesImage extends AboutUs {
  image: string;
}

// ---------- REVIEWS INTERFACES ----------
export interface Review {
  _id: string;
  author: string;
  content: string;
}

export interface ReviewPOST extends ModifyRequest {
  review: Review;
}

export interface ReviewDELETE extends ModifyRequest {
  slettet: boolean;
}
