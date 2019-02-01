import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './LeafletMapWebPart.module.scss';
import * as strings from 'LeafletMapWebPartStrings';
import MapApplication from "./MapApplication";
import * as jQuery from 'jquery';
import 'jqueryui';
import 'leaflet';
import { SPComponentLoader } from '@microsoft/sp-loader';

export interface ILeafletMapWebPartProps {
  description: string;
}

export default class LeafletMapWebPart extends BaseClientSideWebPart<ILeafletMapWebPartProps> {

  public constructor() {
    super();
    SPComponentLoader.loadCss('//unpkg.com/leaflet@1.4.0/dist/leaflet.css');
  }

  public render(): void {
    this.domElement.innerHTML = MapApplication.templateHtml;

    const accordionOptions: JQueryUI.AccordionOptions = {
      animate: true,
      collapsible: false,
      icons: {
        header: 'ui-icon-circle-arrow-e',
        activeHeader: 'ui-icon-circle-arrow-s'
      }
     };

     jQuery('.accordion', this.domElement).accordion(accordionOptions);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
