import * as ACTIONS from '../actions/index';

const initialState = {
  auth: {
    //Previously utilized Okta to enable authenticateUser to set these slices of state.
    isAuthenticated: false,
    profile_id: null,
  },
  userProfile: {
    // when user hits dashboard, make API call to [GET] /profile/:id
    // first_name: 'Test',
    // last_name: 'Test',
    // role_id: 3,
    // ...etc.
  },
  ApplicationStatus: {
    approval_status: '',
    reject_status: '',
  },
  ApplicationProfile: {},
  // notes: {
  // },
  lifecycle: {
    // set to true when API call starts, set to false when API call concludes
    isFetching: false,
  },
  errors: {
    /* TODO: implement a way to track errors */
    mentorError: '',
    menteeError: '',
    notesError: '',
    approvalError: '',
  },
  mentor: {
    successPage: '',
  },
  mentee: {
    successPage: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_FETCH_START:
      return { ...state, lifecycle: { ...state.lifecycle, isFetching: true } };
    case ACTIONS.SET_FETCH_ERROR:
      return { ...state, errors: [action.payload, state.errors] };
    case ACTIONS.SET_FETCH_END:
      return { ...state, lifecycle: { ...state.lifecycle, isFetching: false } };
    case ACTIONS.SET_PROFILE_ID:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: true,
          profile_id: action.payload,
        },
      };
    case ACTIONS.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload, // do not persist previous state.userProfile
      };
    case ACTIONS.SET_APPLICATION_PROFILE:
      return {
        ...state,
        ApplicationProfile: action.payload, // do not persist previous state.userProfile
      };
    case ACTIONS.SET_APPROVAL_SUCCESS:
      return {
        ...state,
        approval_status: action.payload,
        errors: {
          ...state,
          approvalError: '',
        },
      };
    case ACTIONS.SET_REJECT_SUCCESS:
      return {
        ...state,
        reject_status: action.payload,
        errors: {
          ...state,
          rejectError: '',
        },
      };
    case ACTIONS.NOTES_ADD_SUCCESS:
      return {
        ...state,
        notes: action.payload,
        errors: {
          ...state,
          Response: '',
        },
      };
    case ACTIONS.NOTES_ADD_FAILURE:
      return {
        ...state,
        errors: action.payload,
        notes: {
          ...state,
          Failure: '',
        },
      };
    case ACTIONS.MENTOR_ADD_SUCCESS:
      return {
        ...state,
        mentor: action.payload,
        errors: {
          ...state,
          mentorError: '',
        },
      };
    case ACTIONS.MENTOR_ADD_FAILURE:
      return {
        ...state,
        errors: action.payload,
        mentor: {
          ...state,
          successPage: '',
        },
      };
    default:
      return state;
  }
};

export default userReducer;
