export interface TemplatesResponse {
  activate: boolean;
  status: boolean;
  envIds: number[] | undefined;
  action: Action;
  content: string;
  name: string;
  TemplatesPaginated: TemplatesPaginated;
  total: number;
}

export interface TemplatesPaginated {
  data: TemplateDatum[];
  filteredTotal: number;
  templatesPerPage: number;
  totalPages: number;
}

export interface TemplateDatum {
  id: number;
  name: string;
  content: string;
  action: Action;
  templateEnvs: TemplateEnv[];
  status: boolean;
  activate: boolean;
  createdAt: Date;
  updateAt: Date;
}

export interface Action {
  id: number;
  name: string;
}

export interface TemplateEnv {
  id: number;
  name: string;
  key: string;
}
