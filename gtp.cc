/*
 * TMPPATH
 * <c> Sharkbyteprojects
 */
#include <node.h>
#include <Windows.h>

namespace gtp {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  char* buffer=new char[MAX_PATH];
  GetTempPathA(MAX_PATH, (LPSTR)buffer);
  args.GetReturnValue().Set(String::NewFromUtf8(
      isolate, buffer));
}

void getFullTFilePath(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  char* buffer=new char[MAX_PATH-14];
  char* bufferb=new char[MAX_PATH+1];
  GetTempPathA(MAX_PATH-14, (LPSTR)buffer);
  GetTempFileNameA(buffer, "tmp", 0, (LPSTR)bufferb);
  args.GetReturnValue().Set(String::NewFromUtf8(
      isolate, bufferb));
}

void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "gtp", Method);
  NODE_SET_METHOD(exports, "getFullTFilePath", getFullTFilePath);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

} 