import { HomeContent as application_content_HomeContent } from "@/model/application/content/HomeContent";
import { TopContent as application_content_TopContent } from "@/model/application/content/TopContent";
import { Background as domain_callback_Background } from "@/model/domain/callback/Background";
import { HomeButtonMouseDownEvent as domain_event_home_HomeButtonMouseDownEvent } from "@/model/domain/event/home/HomeButtonMouseDownEvent";
import { HomeButtonMouseUpEvent as domain_event_home_HomeButtonMouseUpEvent } from "@/model/domain/event/home/HomeButtonMouseUpEvent";
import { TopButtonMouseUpEvent as domain_event_top_TopButtonMouseUpEvent } from "@/model/domain/event/top/TopButtonMouseUpEvent";
import { TopContentEnterFrameEvent as domain_event_top_TopContentEnterFrameEvent } from "@/model/domain/event/top/TopContentEnterFrameEvent";
import { HomeTextRepository as infrastructure_repository_HomeTextRepository } from "@/model/infrastructure/repository/HomeTextRepository";
import { ButtonComponent as ui_component_atom_ButtonComponent } from "@/model/ui/component/atom/ButtonComponent";
import { TextComponent as ui_component_atom_TextComponent } from "@/model/ui/component/atom/TextComponent";
import { HomeButtonTemplate as ui_component_template_home_HomeButtonTemplate } from "@/model/ui/component/template/home/HomeButtonTemplate";
import { HomeTextTemplate as ui_component_template_home_HomeTextTemplate } from "@/model/ui/component/template/home/HomeTextTemplate";
import { TopButtonTemplate as ui_component_template_top_TopButtonTemplate } from "@/model/ui/component/template/top/TopButtonTemplate";
import { TopContentTemplate as ui_component_template_top_TopContentTemplate } from "@/model/ui/component/template/top/TopContentTemplate";
import { HomeView } from "@/view/home/HomeView";
import { HomeViewModel } from "@/view/home/HomeViewModel";
import { TopView } from "@/view/top/TopView";
import { TopViewModel } from "@/view/top/TopViewModel";

const packages: any[] = [
    ["application.content.HomeContent", application_content_HomeContent],
    ["application.content.TopContent", application_content_TopContent],
    ["domain.callback.Background", domain_callback_Background],
    ["domain.event.home.HomeButtonMouseDownEvent", domain_event_home_HomeButtonMouseDownEvent],
    ["domain.event.home.HomeButtonMouseUpEvent", domain_event_home_HomeButtonMouseUpEvent],
    ["domain.event.top.TopButtonMouseUpEvent", domain_event_top_TopButtonMouseUpEvent],
    ["domain.event.top.TopContentEnterFrameEvent", domain_event_top_TopContentEnterFrameEvent],
    ["infrastructure.repository.HomeTextRepository", infrastructure_repository_HomeTextRepository],
    ["ui.component.atom.ButtonComponent", ui_component_atom_ButtonComponent],
    ["ui.component.atom.TextComponent", ui_component_atom_TextComponent],
    ["ui.component.template.home.HomeButtonTemplate", ui_component_template_home_HomeButtonTemplate],
    ["ui.component.template.home.HomeTextTemplate", ui_component_template_home_HomeTextTemplate],
    ["ui.component.template.top.TopButtonTemplate", ui_component_template_top_TopButtonTemplate],
    ["ui.component.template.top.TopContentTemplate", ui_component_template_top_TopContentTemplate],
    ["HomeView", HomeView],
    ["HomeViewModel", HomeViewModel],
    ["TopView", TopView],
    ["TopViewModel", TopViewModel]
];
export { packages };