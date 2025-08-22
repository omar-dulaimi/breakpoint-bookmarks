<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/omar-dulaimi/breakpoint-bookmarks/master/resources/logo-colorful.png" alt="Breakpoint Bookmarks" width="100">
  <br>
  Breakpoint Bookmarks
  <br>
</h1>

<h4 align="center">🔍 Save, organize, and restore your debugging sessions with ease</h4>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=OmarDulaimi.breakpoint-bookmarks">
    <img src="https://img.shields.io/visual-studio-marketplace/v/OmarDulaimi.breakpoint-bookmarks?style=for-the-badge&logo=visual-studio-code&logoColor=white&label=VS%20Code&color=007ACC" alt="VS Code Marketplace Version">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=OmarDulaimi.breakpoint-bookmarks">
    <img src="https://img.shields.io/visual-studio-marketplace/d/OmarDulaimi.breakpoint-bookmarks?style=for-the-badge&logo=visual-studio-code&logoColor=white&label=Downloads&color=success" alt="VS Code Downloads">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=OmarDulaimi.breakpoint-bookmarks">
    <img src="https://img.shields.io/visual-studio-marketplace/r/OmarDulaimi.breakpoint-bookmarks?style=for-the-badge&logo=visual-studio-code&logoColor=white&label=Rating&color=yellow" alt="VS Code Rating">
  </a>
</p>

<p align="center">
  <a href="https://github.com/omar-dulaimi/breakpoint-bookmarks/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/omar-dulaimi/breakpoint-bookmarks?style=for-the-badge&logo=opensourceinitiative&logoColor=white&label=License&color=blue" alt="License">
  </a>
  <a href="https://github.com/sponsors/omar-dulaimi">
    <img src="https://img.shields.io/badge/Sponsor-❤️-ff69b4?style=for-the-badge&logo=github-sponsors&logoColor=white" alt="Sponsor on GitHub">
  </a>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#supported-languages">Languages</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## 💖 **Does this extension help you debug faster?**

<div align="center">

### If Breakpoint Bookmarks saves you time and makes debugging easier, consider sponsoring its development! 

<p align="center">
  <a href="https://github.com/sponsors/omar-dulaimi">
    <img src="https://img.shields.io/badge/💖%20Sponsor%20this%20project-ff69b4?style=for-the-badge&logo=github-sponsors&logoColor=white" alt="Sponsor on GitHub" height="50">
  </a>
</p>

**Your support helps:**
- 🚀 **Add new features** and improvements
- 🐛 **Fix bugs** and maintain compatibility  
- 📚 **Improve documentation** and tutorials
- ⚡ **Respond faster** to issues and feature requests

*Even $1/month makes a difference and shows you value this work!*

</div>

---

## ✨ What is Breakpoint Bookmarks?

Transform your debugging workflow with **Breakpoint Bookmarks** - the ultimate VS Code extension for managing complex debugging sessions. Save your carefully crafted breakpoint configurations, organize them by feature or bug, and restore them instantly when you need them.

Perfect for developers working on large codebases, multiple features, or complex debugging scenarios where setting up breakpoints repeatedly is time-consuming and error-prone.

## 🚀 Installation

### Via VS Code Marketplace
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for **"Breakpoint Bookmarks"**
4. Click **Install**

### Via Command Palette
```
ext install OmarDulaimi.breakpoint-bookmarks
```

### Via Command Line
```bash
code --install-extension OmarDulaimi.breakpoint-bookmarks
```

## ⭐ Features

<table>
<tr>
<td width="50%">

### 🎯 **Smart Breakpoint Management**
- **🔍 Instant Load** - Restore breakpoints with one click
- **💾 Quick Save** - Save current session via UI button
- **✏️ Direct Edit** - Modify breakpoint JSON files in VS Code
- **🗑️ Safe Delete** - Remove flows with confirmation dialog

</td>
<td width="50%">

### 🚀 **Advanced Features**
- **🔧 Function Breakpoints** - Full support for function-based debugging
- **📍 Source Breakpoints** - Traditional file/line breakpoints
- **🌐 Universal Language Support** - Works with any VS Code language
- **📁 Flexible Storage** - Custom paths and relative/absolute options

</td>
</tr>
<tr>
<td width="50%">

### 🎨 **Modern Interface**
- **🖥️ Clean Sidebar** - Intuitive panel with inline actions
- **🎯 Smart Icons** - Consistent iconography with hover states
- **⚡ Quick Access** - Title bar buttons for common operations
- **🔄 Seamless Integration** - Native VS Code experience

</td>
<td width="50%">

### 🛡️ **Reliability & Compatibility**
- **🔄 Backward Compatible** - Works with existing bookmark files
- **🌍 Cross-Platform** - Windows, macOS, and Linux support
- **🔒 Type Safe** - Built with TypeScript for reliability
- **🧪 Well Tested** - Comprehensive test suite

</td>
</tr>
</table>

## 📸 Usage

### 💾 **Save Your Debugging Setup**

Set up your breakpoints for a specific feature or bug, then save them for later use.

<p align="center">
  <img src="media/save.gif" alt="Save breakpoints demo" width="80%">
</p>

### 🔍 **Load Saved Configurations**

Instantly restore your debugging environment with a single click from the sidebar.

<p align="center">
  <img src="media/load.gif" alt="Load breakpoints demo" width="80%">
</p>

### ⚡ **Quick Actions**

| Action | Method | Description |
|--------|--------|-------------|
| **Save** | Click save button in panel | Save current breakpoints |
| **Load** | Click load icon next to flow | Restore saved breakpoints |
| **Edit** | Click edit icon (pencil) | Modify breakpoint JSON |
| **Delete** | Click delete icon (trash) | Remove saved flow |

## 🌐 Supported Languages

Breakpoint Bookmarks works with **any language supported by VS Code**, including:

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white" alt="Java">
  <img src="https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white" alt="C#">
  <img src="https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white" alt="C++">
  <img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Go">
  <img src="https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white" alt="Rust">
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP">
  <img src="https://img.shields.io/badge/Ruby-CC342D?style=for-the-badge&logo=ruby&logoColor=white" alt="Ruby">
</p>

*...and many more! If VS Code can debug it, Breakpoint Bookmarks can bookmark it.*

## ⚙️ Configuration

Customize Breakpoint Bookmarks to fit your workflow with these settings:

<table>
<tr>
<th width="30%">Setting</th>
<th width="20%">Type</th>
<th width="20%">Default</th>
<th width="30%">Description</th>
</tr>
<tr>
<td><code>breakpointBookmark.useRelativePaths</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Use relative paths for cross-machine compatibility</td>
</tr>
<tr>
<td><code>breakpointBookmark.clearPreviousBreakpoints</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Clear existing breakpoints when loading a flow</td>
</tr>
<tr>
<td><code>breakpointBookmark.saveLocation</code></td>
<td><code>string</code></td>
<td><code>""</code></td>
<td>Custom folder path for bookmark storage</td>
</tr>
</table>

### 🛠️ **How to Configure**

1. Open VS Code Settings (`Ctrl+,`)
2. Search for "breakpoint bookmark" 
3. Adjust settings to your preference
4. Changes take effect immediately

## 🆕 Recent Improvements

<details>
<summary><strong>✨ Version 1.2.0 - Major Update</strong></summary>

### 🎨 **Enhanced User Interface**
- ✅ **Edit Button** - Direct modification of saved breakpoint files
- ✅ **Improved Icons** - Consistent iconography with hover states  
- ✅ **Better Organization** - Cleaner sidebar with inline actions
- ✅ **Quick Access** - Save button in panel title bar

### 🐛 **Critical Bug Fixes**
- ✅ **Windows Path Issues** - Resolved drive letter corruption
- ✅ **Visual Indicators** - Fixed red dots not appearing after load
- ✅ **UI Pollution** - Buttons no longer appear in other views
- ✅ **Cross-Platform** - Robust path handling on all OS

### 🔧 **Advanced Features**  
- ✅ **Function Breakpoints** - Full support alongside source breakpoints
- ✅ **Mixed Collections** - Save different breakpoint types together
- ✅ **Backward Compatibility** - Existing files work seamlessly
- ✅ **Better Validation** - Enhanced error handling and feedback

### 🏗️ **Code Quality**
- ✅ **TypeScript** - Full type safety throughout
- ✅ **Modular Architecture** - Clean, maintainable code
- ✅ **Comprehensive Testing** - 11/11 tests passing
- ✅ **Error Resilience** - Robust error management

</details>

## 🎯 Supported Breakpoint Types

<table>
<tr>
<td width="50%">

### 📍 **Source Breakpoints**
*Traditional file/line breakpoints*

✅ **Line-specific debugging**  
✅ **Conditional breakpoints**  
✅ **Hit count conditions**  
✅ **Log messages (tracepoints)**  
✅ **Cross-platform file paths**  

</td>
<td width="50%">

### 🔧 **Function Breakpoints**
*Function-based debugging*

✅ **Function name targeting**  
✅ **Library code debugging**  
✅ **Dynamic function calls**  
✅ **Same conditions as source**  
✅ **Runtime function resolution**  

</td>
</tr>
</table>

## 🔧 Troubleshooting

<details>
<summary><strong>🐛 Common Issues & Solutions</strong></summary>

### ❓ **Breakpoints don't appear as red dots after loading**
> ✅ **Fixed in v1.2.0+** - Update to the latest version and reload VS Code

### ❓ **Export creates corrupted paths on Windows**  
> ✅ **Fixed in v1.2.0+** - Windows path doubling issue resolved

### ❓ **Extension buttons appear in other VS Code views**  
> ✅ **Fixed in v1.2.0+** - UI isolation properly implemented

### ❓ **Function breakpoints aren't being saved**  
> ✅ **Supported in v1.2.0+** - Full function breakpoint support added

### ❓ **Cannot read properties of undefined (reading 'line')**  
> ✅ **Fixed in v1.2.0+** - Enhanced backward compatibility for all bookmark formats

</details>

<details>
<summary><strong>🆘 Getting Help</strong></summary>

If you encounter issues:

1. **Update Extension** - Ensure you have the latest version
2. **Reload VS Code** - `Ctrl+Shift+P` → "Developer: Reload Window"  
3. **Check Console** - `Help` → `Toggle Developer Tools` → `Console` tab
4. **Report Issue** - [GitHub Issues](https://github.com/omar-dulaimi/breakpoint-bookmarks/issues) with:
   - VS Code version
   - Extension version  
   - Operating system
   - Steps to reproduce
   - Error messages

</details>

## 🤝 Contributing

We welcome contributions! Here's how you can help:

<table>
<tr>
<td align="center" width="25%">
<h3>🐛</h3>
<strong>Report Bugs</strong><br>
Found an issue?<br>
<a href="https://github.com/omar-dulaimi/breakpoint-bookmarks/issues">Open an Issue</a>
</td>
<td align="center" width="25%">
<h3>💡</h3>
<strong>Suggest Features</strong><br>
Have an idea?<br>
<a href="https://github.com/omar-dulaimi/breakpoint-bookmarks/issues">Feature Request</a>
</td>
<td align="center" width="25%">
<h3>🔧</h3>
<strong>Submit PRs</strong><br>
Want to contribute?<br>
<a href="https://github.com/omar-dulaimi/breakpoint-bookmarks/pulls">Pull Request</a>
</td>
<td align="center" width="25%">
<h3>⭐</h3>
<strong>Star & Review</strong><br>
Show your support<br>
<a href="https://marketplace.visualstudio.com/items?itemName=OmarDulaimi.breakpoint-bookmarks">Rate Extension</a>
</td>
</tr>
</table>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## 💖 Support

If this extension helps you debug faster and more efficiently, consider:

<p align="center">
  <a href="https://github.com/sponsors/omar-dulaimi">
    <img src="https://img.shields.io/badge/Sponsor-❤️-ff69b4?style=for-the-badge&logo=github-sponsors&logoColor=white" alt="Sponsor on GitHub">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=OmarDulaimi.breakpoint-bookmarks&ssr=false#review-details">
    <img src="https://img.shields.io/badge/Review-⭐-yellow?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="Leave a Review">
  </a>
</p>

---

<p align="center">
  <sub>Built with ❤️ by <a href="https://github.com/omar-dulaimi">Omar Dulaimi</a></sub>
</p>
