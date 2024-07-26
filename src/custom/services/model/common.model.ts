export interface List<T> {
  list: T[];
}

export interface Page<T> {
  code: number;
  data: T;
  message: string;
}

export interface TokenModel {
  token: string;
  is_admin: boolean;
}

export interface BatchSeqInfoParamsModel {
  cdr_definition: string;
  sequences: string[];
}

export interface SeqInfoModel {
  sequence: string;
  aa_list: ResidueModel[];
}

export interface ResidueModel {
  aa: string;
  chain_type: string;
  is_cdr: boolean | null;
}
