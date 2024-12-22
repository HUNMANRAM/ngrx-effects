export interface FailureCasesState {
    failureCases: any[];    // Array to store all failure cases
    loading: boolean;       // Indicates if data is being loaded
    currentPage: number;    // Current page index
    totalCasesCount: number; // Total number of cases (from the API response)
    completedCount: number; // Completed cases count (from the API response)
    lockedCount: number;    // Locked cases count (from the API response)
  }
  
  export const initialState: FailureCasesState = {
    failureCases: [],
    loading: false,
    currentPage: 1,
    totalCasesCount: 0,
    completedCount: 0,
    lockedCount: 0,
  };
  